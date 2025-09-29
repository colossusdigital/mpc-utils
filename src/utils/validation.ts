import { errorExit } from '@/utils/error';

export function validateSplitArgs(sharesNum: number, threshold: number) {
	if (threshold > sharesNum) {
		errorExit('threshold cannot be greater than sharesNum');
	}
	if (threshold <= 1) {
		errorExit('Threshold must be at least 2 for proper security.');
	}
	if (sharesNum < 2) {
		errorExit('The number of shares must be at least 2.');
	}
}
