import {EntriesPipe} from './entries_pipe';
import {IndexedPipe} from './indexed_pipe';
import {RangePipe} from './range_pipe';
import {ReversedPipe} from './reversed_pipe';
import {SortedPipe} from './sorted_pipe';

export {EntriesPipe, IndexedPipe, RangePipe, ReversedPipe, SortedPipe};

export const COMMON_PIPES: Array<any> = [ EntriesPipe, IndexedPipe, RangePipe, ReversedPipe, SortedPipe ];

