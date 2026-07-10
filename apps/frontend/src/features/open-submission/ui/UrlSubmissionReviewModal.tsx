import { useSearchParams } from "react-router";
import { SubmissionReviewModal } from "./SubmissionReviewModal";

const URL_PARAM = "submissionId";

export function UrlSubmissionReviewModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const submissionId = Number(searchParams.get(URL_PARAM)) || null;

  const onClose = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete(URL_PARAM);
      return next;
    });
  };

  if (submissionId == null) return null;

  return (
    <SubmissionReviewModal
      submissionId={submissionId}
      isOpen
      onClose={onClose}
    />
  );
}
