"use client";

import { BasicInput } from "@/components/input-field/basic-input";
import { useSortStore } from "@/providers/sort-store-provider";
import SearchIcon from "@/public/icons/search.svg";
import { AnimatePresence, motion, useInView } from "framer-motion";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function SearchBar() {
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(formRef, { amount: "some" });
  const [isShow, setIsShow] = useState(true);
  // state 하나 만들어서 스크롤 이벤트를 기반으로 사라지는 SearchBar 생성
  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting },
  } = useForm();
  const setKeyword = useSortStore((state) => state.setKeyword);
  const setOrderBy = useSortStore((state) => state.setOrderBy);
  const setPage = useSortStore((state) => state.setPage);
  const onSubmit = (data: FieldValues) => {
    if (!isSubmitting) {
      setKeyword(data.keyword);
      setPage(1);
      setOrderBy("recent");
      setValue("keyword", "", { shouldValidate: false });
    }
  };

  useEffect(() => {
    if (isInView) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }, [isInView]);

  return (
    <>
      <form
        className="relative"
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
      >
        <BasicInput
          register={register}
          id="keyword"
          placeholder="검색어를 입력해주세요"
          className="h-12 pl-[48px] text-sm font-normal text-text-default md:h-14 md:pl-[52px] md:text-base"
        />
        <SearchIcon className="absolute left-4 top-3 h-6 w-6 md:top-4" />
      </form>
      <AnimatePresence>
        {!isShow && (
          <motion.section
            transition={{ type: "tween", duration: 0.3 }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed left-0 right-0 top-[60px] z-30 bg-background-secondary pb-2"
          >
            <form
              className="relative mx-auto w-full max-w-[1200px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <BasicInput
                register={register}
                id="keyword"
                placeholder="검색어를 입력해주세요"
                className="h-12 pl-[48px] text-sm font-normal text-text-default md:h-14 md:pl-[52px] md:text-base"
              />
              <SearchIcon className="absolute left-4 top-3 h-6 w-6 md:top-4" />
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
