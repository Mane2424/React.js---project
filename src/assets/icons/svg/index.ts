import React from 'react';

//Icons
import { ReactComponent as Share } from './share.svg';
import { ReactComponent as GoBack } from './goBack.svg';
import { ReactComponent as Search } from './search.svg';
import { ReactComponent as Download } from './download.svg';
import { ReactComponent as Location } from './location.svg';
import { ReactComponent as ArrowDown } from './arrowDown.svg';

export interface ISvgIcons {
  share: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>;
  arrowDown: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>;
  location: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>;
  goBack: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>;
  search: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>;
  download: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>;
}

export const svgIcons: ISvgIcons = {
  share: Share,
  goBack: GoBack,
  location: Location,
  arrowDown: ArrowDown,
  search: Search,
  download: Download,
};