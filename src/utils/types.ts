export interface SplitArgs {
	sharesNum?: number;
	threshold?: number;
	outputType?: 'json' | 'text';
	filePath?: string;
}

export interface RecombineArgs {
	shares?: (string | number)[];
}
