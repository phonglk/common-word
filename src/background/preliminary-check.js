import { _set, getSync } from '../common/storage';
import { info } from '../common/log';
import { sync as syncStorage } from '../const/default-storage';

export default async function preliminaryCheck() {
  const hasSync = await getSync('_hasSyncStorage');
  if (hasSync !== true) {
    info('This extension looks like first time run');
    await _set(syncStorage);
    info('Configured for the first run');
  } else {
    info('Extension configuration looks ok');
  }
}
