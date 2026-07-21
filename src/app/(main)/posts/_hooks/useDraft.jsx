import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

export default function useDraft(title) {
  const [draftList, setDraftList] = useState([]);

  const getDrafts = () => {
    const allRelatedDrafts = Object.entries({ ...localStorage })
      .map(([id, value]) => ({
        id,
        ...JSON.parse(value),
      }))
      .filter((draft) => draft && draft.title === title)
      .sort((draft1, draft2) => new Date(draft2.createdAt) - new Date(draft1.createdAt));

    setDraftList(allRelatedDrafts);

    return allRelatedDrafts;
  };

  const saveDraft = (content) => {
    const id = nanoid();

    const draft = {
      id,
      title,
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
  }, []);

  return {
    draftList,
    saveDraft,
    deleteDraft,
  };
}
