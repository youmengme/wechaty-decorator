"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CONFIG = void 0;
const warn = [
    '{{ downEmoji }}-{{ downNum }}{{#upNum}} | +{{ upNum }}{{ upEmoji }}{{/upNum}}',
    '———————————',
    'The one who has been voted {{ downEmoji }} by {{ threshold }} people will be removed from the room as an unwelcome guest.',
    '{{#upNum}}{{ upEmoji }} By {{ upVoters }}{{/upNum}}',
    '{{#downNum}}{{ downEmoji }} By {{ downVoters }}{{/downNum}}'
].join('\n');
const kick = [
    'UNWELCOME GUEST CONFIRMED:\n[Dagger] {{ votee }} [Cleaver]\n\nThank you [Rose] {{ downVoters }} [Rose] for voting for the community, we appreciate it.\n\nThanks everyone in this room for respecting our CODE OF CONDUCT.\n',
    'Removing {{ votee }} out of this room ...',
    (message) => __awaiter(void 0, void 0, void 0, function* () {
        const room = message.room();
        if (room) {
            const mentionList = yield message.mentionList();
            const votee = mentionList[0];
            if (votee) {
                return room.del(votee).then(_ => 'Done.');
            }
        }
    })
];
const repeat = [
    'You can only vote {{ votee }} for once.'
];
exports.DEFAULT_CONFIG = {
    downEmoji: [
        '[ThumbsDown]',
        '[弱]',
        '/:MMWeak',
        '<img class="qqemoji qqemoji80" text="[弱]_web" src="/zh_CN/htmledition/v2/images/spacer.gif" />'
    ],
    kick,
    repeat,
    threshold: 3,
    upEmoji: [
        '[ThumbsUp]',
        '[强]',
        '/:MMStrong',
        '< img class="qqemoji qqemoji79" text="[强]_web" src="/zh_CN/htmledition/v2/images/spacer.gif”>'
    ],
    warn,
    whitelist: (_) => false
};
//# sourceMappingURL=config.js.map