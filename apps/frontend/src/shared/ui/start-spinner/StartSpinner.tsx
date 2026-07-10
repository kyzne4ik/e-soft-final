import { Spinner } from "@repo/ui/atoms/spinner";
import { Flex } from "@repo/ui/layouts/flex";
import { classNames } from "@repo/ui/libs/classNames";
import css from "./StartSpinner.module.css";

export function StartSpinner() {
  return (
    <Flex flexFull className={classNames(css.container)}>
      <Spinner size={36} />
    </Flex>
  );
}
