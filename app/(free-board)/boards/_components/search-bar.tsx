"use client";

import { BasicInput } from "@/components/input-field/basic-input";
import { useSortStore } from "@/providers/sort-store-provider";
import SearchIcon from "@/public/icons/search.svg";
import { FieldValues, useForm } from "react-hook-form";

export default function SearchBar() {
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
  return (
    <form className="relative" onSubmit={handleSubmit(onSubmit)}>
      <BasicInput
        register={register}
        id="keyword"
        placeholder="검색어를 입력해주세요"
        className="h-12 pl-[48px] text-sm font-normal text-text-default md:h-14 md:pl-[52px] md:text-base"
      />
      <SearchIcon className="absolute left-4 top-3 h-6 w-6 md:top-4" />
    </form>
  );
}
