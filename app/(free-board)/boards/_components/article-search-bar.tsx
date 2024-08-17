"use client";

import { BasicInput } from "@/components/input-field/basic-input";
import { useProgressBar } from "@/components/progress-bar/progress-bar";
import SearchIcon from "@/public/icons/search.svg";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ArticleSearchBarForm {
  keyword: string;
}

export default function ArticleSearchBar() {
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(formRef, { amount: "some" });
  const [isShow, setIsShow] = useState(true);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting },
  } = useForm<{ keyword: string }>();
  const { progress } = useProgressBar();
  const router = useRouter();
  const onSubmit: SubmitHandler<ArticleSearchBarForm> = (data) => {
    if (!isSubmitting) {
      setValue("keyword", "");
      progress(() => router.push(`/boards?keyword=${data.keyword}`));
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
            className="fixed left-0 right-0 top-[60px] z-30 bg-background-secondary pb-2 shadow-xl"
          >
            <form
              className="relative mx-auto w-full max-w-[1200px] pt-1"
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
