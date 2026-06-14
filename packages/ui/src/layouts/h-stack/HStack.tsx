import { Flex, type FlexProps } from "../flex/Flex";

type HStackProps = Omit<FlexProps, "direction">;

export const HStack = (props: HStackProps) => (
  <Flex direction="row" {...props} />
);
