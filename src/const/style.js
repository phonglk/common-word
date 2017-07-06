export const THRESHOLD_TOOLBAR_SHOW = 800;
export const THRESHOLD_TOOLBAR_PROGRESS_SHOW = 51;

const CLASS_PREFIX = 'extension-cw--';
const pre = a => CLASS_PREFIX + a;

export const CLASS_WORD = pre('word');
export const CLASS_UNKNOWN_WORD = pre('word--unknown');
export const CLASS_KNOWN_WORD = pre('word--known');

export const CLASS_TOOL_ADD_TO_KNOWN_LIST = pre('tool--known');
export const CLASS_TOOLBAR_MOUNT_DIV = pre('tool--div-mount');
export const CLASS_PROGRESS_TO_SHOW_TOOLBAR = pre('progress--toolbar-enable');
export const CLASS_SIDEBAR_WRAP = pre('sidebar--wrapper');
export const CLASS_SIDEBAR_WORDLIST = pre('sidebar--wordlist');
export const CLASS_SIDEBAR_KNOWN_WORD = pre('sidebar--known-word');
export const CLASS_SIDEBAR_TOOLBAR = pre('sidebar--toolbar');
export const PROP_WORD = pre('word');
