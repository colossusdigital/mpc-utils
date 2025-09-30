export interface SplitArgs {
	secret?: string;
	sharesNum?: number;
	threshold?: number;
	outputType?: 'json' | 'file';
	filePath?: string;
}

export interface RecombineArgs {
	shares?: (string | number)[];
	outputType?: 'json' | 'file';
	filePath?: string;
}
