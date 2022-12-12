// by default router declaration goes into the ts4.0 folder, remove this after react-router authors will fix this
import { ExtractRouteParams } from 'react-router/index';

declare module 'react-router' {
  export type { ExtractRouteParams };
}
