export interface AccountMenuElem {
  title: string;
  Icon: React.VFC<React.SVGProps<SVGElement>>;
  onClick: () => void;
  hasDivider: boolean;
}
