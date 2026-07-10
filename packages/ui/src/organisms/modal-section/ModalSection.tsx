import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useState,
} from "react";
import { classNames } from "../../libs/classNames";
import { Icon } from "../../atoms/icon";
import { Modal } from "../modal";
import css from "./ModalSection.module.css";

export interface ModalSectionItemProps {
  id: string;
  label: ReactNode;
  icon?: string;
  children: ReactNode;
}

export interface ModalSectionProps {
  isOpen?: boolean;
  onClose: () => void;
  activeSection?: string;
  defaultSection?: string;
  onSectionChange?: (id: string) => void;
  children: ReactNode;
}

export function ModalSection({
  isOpen = false,
  onClose,
  activeSection,
  defaultSection,
  onSectionChange,
  children,
}: ModalSectionProps) {
  const sections = Children.toArray(children).filter(
    (node): node is ReactElement<ModalSectionItemProps> =>
      isValidElement(node) && node.type === ModalSection.Item,
  );

  const firstId = sections[0]?.props.id;
  const [internal, setInternal] = useState<string | undefined>(
    defaultSection ?? firstId,
  );
  const current = activeSection ?? internal ?? firstId;

  const select = (id: string) => {
    setInternal(id);
    onSectionChange?.(id);
  };

  const activeEl =
    sections.find((section) => section.props.id === current) ?? sections[0];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="wide">
      <div className={css.ui_modal_section}>
        <nav className={css.ui_modal_section__nav}>
          {sections.map((section) => {
            const isActive = section.props.id === current;
            return (
              <button
                key={section.props.id}
                type="button"
                className={classNames(css.ui_modal_section__navitem, {
                  [css.ui_modal_section__navitem__active]: isActive,
                })}
                aria-current={isActive ? "page" : undefined}
                onClick={() => select(section.props.id)}
              >
                {section.props.icon ? (
                  <Icon name={section.props.icon} size={18} />
                ) : null}
                {section.props.label}
              </button>
            );
          })}
        </nav>

        <div className={css.ui_modal_section__panel}>
          {activeEl ? (
            <>
              <h2 className={css.ui_modal_section__title}>
                {activeEl.props.label}
              </h2>
              {activeEl}
            </>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}

ModalSection.Item = function ModalSectionItem({
  children,
}: ModalSectionItemProps) {
  return <>{children}</>;
};

export interface ModalSectionRowProps {
  label: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}

ModalSection.Row = function ModalSectionRow({
  label,
  description,
  children,
  className,
}: ModalSectionRowProps) {
  return (
    <div className={classNames(css.ui_modal_section__row, {}, [className])}>
      <div className={css.ui_modal_section__row__label}>
        <span className={css.ui_modal_section__row__title}>{label}</span>
        {description ? (
          <span className={css.ui_modal_section__row__desc}>{description}</span>
        ) : null}
      </div>
      {children != null ? (
        <div className={css.ui_modal_section__row__control}>{children}</div>
      ) : null}
    </div>
  );
};
