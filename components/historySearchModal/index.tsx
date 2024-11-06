"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import debounce from "lodash.debounce";
import { IconSearch } from "@tabler/icons-react";

import Modal from "@/src/components/modal";
import Input from "@/src/components/interactive/input";

import { getHistories } from "@/src/lib/actions/history";
import { HistoryType } from "@/src/lib/types/history";

import classes from "./historySearchModal.module.css";

type SearchModalProps = {
  searchModalOpened: boolean;
  onClose: () => void;
};

const SearchModal = ({ searchModalOpened, onClose }: SearchModalProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchHistories, setSearchHistories] = useState<HistoryType[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      const searchedHistory = await getHistories({ searchValue: value });
      setSearchHistories(searchedHistory || []);
    }, 500),
    []
  );

  useEffect(() => {
    if (!searchValue) {
      setSearchHistories([]);
      return;
    }

    debouncedSearch(searchValue);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchValue, debouncedSearch]);

  return (
    <Modal isOpen={searchModalOpened} onClose={onClose} noPadding noFooter>
      <div className={classes.searchModal}>
        <div className={classes.searchModalHeader}>
          <IconSearch />
          <Input placeholder="Search History" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </div>
      </div>

      <div className={classes.searchModalBody}>
        {searchHistories.map((history) => (
          <Link href={`/history/${history.url}`} key={history.id} className={classes.link} onClick={onClose}>
            <div className={classes.searchModalBodyItem}>
              <div className={classes.searchModalBodyItemContent}>
                <span className={classes.searchModalBodyItemTitle}>{history.title}</span>
                <span className={classes.searchModalBodyItemSummary}>{history.summary}</span>
              </div>

              {history?.tags && (
                <div className={classes.searchModalBodyItemTags}>
                  {history.tags.map((tag) => (
                    <span key={tag.id} className={classes.historyTag}>
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </Modal>
  );
};

export default SearchModal;
