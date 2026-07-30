import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

export default function useDraft(translationId) {
  const [isDraftLoaded, setIsDraftLoaded] = useState(false);
  const [draftList, setDraftList] = useState([]);

  const getDrafts = () => {
    const allRelatedDrafts = Object.entries({ ...localStorage })
      .filter(([id, _]) => id.startsWith("draft_"))
      .map(([id, value]) => {
        try {
          return {
            id,
            ...JSON.parse(value),
          };
        } catch {
          return null;
        }
      })
      .filter((draft) => draft && draft.translationId === translationId)
      .sort((draft1, draft2) => new Date(draft2.createdAt) - new Date(draft1.createdAt));

    setDraftList(allRelatedDrafts);

    return allRelatedDrafts;
  };

  const saveDraft = (content) => {
    const id = `draft_${nanoid()}`;

    const draft = {
      id,
      translationId,
      content,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(id, JSON.stringify(draft));
    setDraftList((prev) => [draft, ...prev]);
  };

  const deleteDraft = (id) => {
    localStorage.removeItem(id);

    setDraftList((prev) => prev.filter((draft) => draft.id !== id));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getDrafts();
    setIsDraftLoaded(true);
  }, [translationId]);

  return {
    isDraftLoaded,
    draftList,
    saveDraft,
    deleteDraft,
  };
}
