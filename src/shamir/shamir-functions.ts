import { Buffer } from 'buffer';
import { createHash } from 'crypto';
import seedrandom from 'seedrandom';
import { split, combine } from 'shamirs-secret-sharing';
import { errorExit } from '../utils/error';

/**
 * Generates a simple SHA256 checksum for a given string.
 * @param data The string to hash.
 * @returns The SHA256 hash as a hex string.
 */
function generateChecksum(data: string): string {
	return createHash('sha256').update(data).digest('hex');
}

/**
 * Splits a secret into shares, or retrieves existing shares if already generated.
 * Allows providing a seed for deterministic share generation (USE WITH CAUTION).
 *
 * @param secret The original secret string.
 * @param shares The total number of shares to generate/retrieve.
 * @param threshold The minimum number of shares required to reconstruct the secret.
 * WARNING: Using a fixed seed compromises the perfect secrecy property of SSS.
 * Only use if share reproducibility is paramount and security implications are understood.
 * @returns An array of share strings (hex encoded).
 */
export function splitSecret(secret: string, shares: number, threshold: number): string[] {
	const checksum = generateChecksum(secret);
	const seed = checksum;
	const secretWithChecksum = `${secret}::CHECKSUM::${checksum}`;
	const secretBuffer = Buffer.from(secretWithChecksum, 'utf8');

	const rng = seedrandom(seed);
	const randomFn: (size: number) => Buffer = (size: number) => {
		const buffer = Buffer.alloc(size);
		for (let i = 0; i < size; i++) {
			buffer[i] = Math.floor(rng() * 256);
		}
		return buffer;
	};

	const generatedShareBuffers = split(secretBuffer, {
		random: randomFn,
		shares,
		threshold,
	});

	return generatedShareBuffers.map(shareBuffer => shareBuffer.toString('hex'));
}

export function recombineShares(shares: string[], customErrMsg: string = undefined): string {
	const shareBuffers = shares.map(shareString => Buffer.from(shareString, 'hex'));

	let reconstructedSecretBuffer: Buffer;
	try {
		reconstructedSecretBuffer = combine(shareBuffers);
	} catch (error) {
		if (error.message.includes('not enough shares')) {
			errorExit('Insufficient shares provided for recombination.');
		}
		errorExit(`Failed to recombine shares: ${error.message}`);
	}

	const reconstructedSecretWithChecksum = reconstructedSecretBuffer.toString('utf8');

	const parts = reconstructedSecretWithChecksum.split('::CHECKSUM::');
	if (parts.length !== 2) {
		errorExit(
			customErrMsg || 'Invalid secret format: Checksum delimiter not found after recombination.',
		);
	}

	const originalSecret = parts[0];
	const receivedChecksum = parts[1];
	const calculatedChecksum = generateChecksum(originalSecret);

	if (calculatedChecksum !== receivedChecksum) {
		errorExit(
			customErrMsg || 'Checksum mismatch: The recombined secret is corrupted or incorrect.',
		);
	}

	return originalSecret;
}
