import type { Room, Contact } from 'wechaty';
import { VoteOutConfig } from './config';
import type { VotePayload } from './store';
export interface MustacheView {
    threshold: number;
    downEmoji: string;
    downNum?: number;
    downVoters?: string;
    upEmoji?: string;
    upNum?: number;
    upVoters?: string;
    votee: string;
}
declare function getMustacheView(config: VoteOutConfig, payload: VotePayload, room: Room, votee: Contact): Promise<MustacheView>;
export declare function getAtNameText(contactIdList: string[], room: Room): Promise<string>;
export { getMustacheView, };
