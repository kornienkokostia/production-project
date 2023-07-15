export interface AccountPopupElem {
  title: string;
  Icon: React.VFC<React.SVGProps<SVGElement>>;
  onClick: () => void;
  hasDivider: boolean;
}
