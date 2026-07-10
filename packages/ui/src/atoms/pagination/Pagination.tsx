import { Button } from "../button";
import css from "./Pagination.module.css";
import { classNames } from "../../libs/classNames";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationMeta } from "./Pagination.types";

export interface PaginationProps {
  meta: PaginationMeta;
  onChange: (page: number) => void;
  className?: string;
  siblingCount?: number;
}

function getPageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): (number | "ellipsis")[] {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  const pages: (number | "ellipsis")[] = [];

  pages.push(1);

  if (showLeftEllipsis) {
    pages.push("ellipsis");
  } else {
    for (let i = 2; i < leftSiblingIndex; i++) {
      pages.push(i);
    }
  }

  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    if (i !== 1 && i !== totalPages) {
      pages.push(i);
    }
  }

  if (showRightEllipsis) {
    pages.push("ellipsis");
  } else {
    for (let i = rightSiblingIndex + 1; i < totalPages; i++) {
      pages.push(i);
    }
  }

  pages.push(totalPages);

  return pages;
}

export function Pagination({
  meta,
  onChange,
  className,
  siblingCount = 1,
}: PaginationProps) {
  const { page: currentPage, totalPages } = meta;

  if (totalPages <= 1) return null;

  const pages = getPageRange(currentPage, totalPages, siblingCount);

  return (
    <nav
      className={classNames(css.pagination, {}, [className])}
      aria-label="Pagination"
    >
      <Button
        variant="ghost"
        size="sm"
        isDisabled={currentPage <= 1}
        onClick={() => onChange(currentPage - 1)}
        aria-label="Предыдущая страница"
        className={css.pagination__nav}
      >
        <ChevronLeft size={16} />
        Назад
      </Button>

      <ul className={css.pagination__list}>
        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <li key={`ellipsis-${index}`} className={css.pagination__ellipsis}>
              &hellip;
            </li>
          ) : (
            <li key={page}>
              <Button
                variant={page === currentPage ? "primary" : "ghost"}
                size="sm"
                isIconOnly
                onClick={() => onChange(page)}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
                className={css.pagination__page}
              >
                {page}
              </Button>
            </li>
          ),
        )}
      </ul>

      <Button
        variant="ghost"
        size="sm"
        isDisabled={currentPage >= totalPages}
        onClick={() => onChange(currentPage + 1)}
        aria-label="Следующая страница"
        className={css.pagination__nav}
      >
        Вперёд
        <ChevronRight size={16} />
      </Button>
    </nav>
  );
}
