import { ArrowDownIcon, ArrowUpIcon } from "@sanity/icons";

export const SmallTextIcon = () => <ArrowDownIcon />;

export const SmallTextDecorator = ({
  children,
}: {
  children: React.ReactNode;
}) => <span style={{ fontSize: ".875rem" }}>{children}</span>;

export const UppercaseTextIcon = () => <ArrowUpIcon />;

export const UppercaseTextDecorator = ({
  children,
}: {
  children: React.ReactNode;
}) => <span style={{ textTransform: "uppercase" }}>{children}</span>;
