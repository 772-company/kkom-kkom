"use client";

import Popover from "@/components/popover/popover";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { getGroupInfo } from "@/lib/apis/group";
import { patchChangeTaskListIndex } from "@/lib/apis/task-list";
import { GetGroupsIdResponse } from "@/lib/apis/type";
import Kebab from "@/public/icons/kebab-small.svg";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";

import ModalTaskListAdd from "./modal/modal-task-list-add";
import ModalTaskListDelete from "./modal/modal-task-list-delete";
import ModalTaskListNameEdit from "./modal/modal-task-list-name-edit";
import StrictModeDroppable from "./strict-mode-droppable";

type TaskListType = GetGroupsIdResponse["taskLists"][0];

interface TaskListProps {
  taskList: TaskListType;
  groupId: string;
  index: number;
}

interface TaskListsProps {
  groupId: string;
  isAdmin: boolean;
}

const COLORS = [
  "bg-point-pink",
  "bg-point-rose",
  "bg-point-orange",
  "bg-point-yellow",
  "bg-point-cyan",
  "bg-point-blue",
  "bg-point-purple",
];

function TaskList({ taskList, groupId, index }: TaskListProps) {
  const ModalTaskListNameEditOverlay = useCustomOverlay(({ close }) => (
    <ModalTaskListNameEdit
      close={close}
      groupId={groupId}
      taskListId={taskList.id}
      currentTaskListName={taskList.name}
    />
  ));
  const ModalTaskListDeleteOverlay = useCustomOverlay(({ close }) => (
    <ModalTaskListDelete
      groupId={groupId}
      taskListId={taskList.id}
      taskListName={taskList.name}
      close={close}
    />
  ));

  const colorIndex = index % 7;
  const pointColor = COLORS[colorIndex];
  const numberOfDone = taskList.tasks.filter(
    (tasks) => tasks.doneAt != null,
  ).length;

  const isDone = numberOfDone === taskList.tasks.length;
  const router = useRouter();

  return (
    <div
      role="presentation"
      onClick={() => router.push(`/${groupId}/tasks?id=${taskList.id}`)}
      className="flex h-[40px] cursor-pointer items-center justify-between rounded-[12px] bg-background-secondary text-[14px] font-[500] leading-[40px] text-text-primary hover:bg-background-tertiary hover:shadow-lg active:bg-background-tertiary active:shadow-lg"
    >
      <div className="flex gap-[12px]">
        <div className={`w-[12px] rounded-l-[12px] ${pointColor}`} />
        <p>{taskList.name}</p>
      </div>
      <div className="flex items-center gap-[10px] pr-[8px]">
        <div className="flex h-[25px] items-center gap-[4px] rounded-[12px] bg-background-primary px-[8px]">
          {isDone ? (
            <Image
              priority
              src="/icons/progress-done.svg"
              alt="체크 아이콘"
              width={16}
              height={16}
            />
          ) : (
            <Image
              priority
              src="/icons/progress-ongoing.svg"
              alt="할 일 스피너"
              width={16}
              height={16}
              className="animate-spin"
            />
          )}
          <p>
            {numberOfDone} / {taskList.tasks.length}
          </p>
        </div>
        <button
          type="submit"
          aria-label="팝오버"
          onClick={(event) => {
            event.stopPropagation(); // 클릭 이벤트 전파 중지
          }}
        >
          <Popover
            triggerSvg={Kebab}
            triggerHeight={16}
            triggerWidth={16}
            content={[
              { text: "수정하기", onClick: ModalTaskListNameEditOverlay.open },
              { text: "삭제하기", onClick: ModalTaskListDeleteOverlay.open },
            ]}
            contentClassName="z-10 border-[1px] absolute right-0 bg-background-secondary border-border-primary/10 w-[120px] h-[80px] text-text-secondary"
          />
        </button>
      </div>
    </div>
  );
}

function TaskLists({ groupId, isAdmin }: TaskListsProps) {
  const ModalTaskListAddOverlay = useCustomOverlay(({ close }) => (
    <ModalTaskListAdd close={close} groupId={groupId} />
  ));

  const { data } = useQuery<GetGroupsIdResponse>({
    queryKey: ["groupInfo", groupId],
    queryFn: () => getGroupInfo({ groupId }),
  });

  const [taskLists, setTaskLists] = useState<TaskListType[]>(
    data ? data.taskLists : [],
  );

  useEffect(() => {
    if (data) {
      setTaskLists(data.taskLists);
    }
  }, [data]);

  const onDragEnd = async (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const updatedTaskLists = Array.from(taskLists);
    const [movedTaskList] = updatedTaskLists.splice(source.index, 1);
    updatedTaskLists.splice(destination.index, 0, movedTaskList);

    const updates = updatedTaskLists.map((taskList, index) => ({
      taskListId: taskList.id,
      displayIndex: index,
    }));

    setTaskLists(updatedTaskLists);

    await Promise.all(
      updates.map(({ taskListId, displayIndex }) =>
        patchChangeTaskListIndex(groupId, taskListId, { displayIndex }),
      ),
    );
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-[8px]">
          <p className="text-[16px] font-[500] text-text-primary">할 일 목록</p>
          <p className="text-[16px] font-[400] text-text-default">
            ({taskLists.length}개)
          </p>
        </div>
        {isAdmin && (
          <button
            type="submit"
            className="text-[14px] font-[400] text-brand-primary hover:scale-[1.02] active:scale-[0.98]"
            onClick={ModalTaskListAddOverlay.open}
          >
            + 새로운 목록 추가하기
          </button>
        )}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="droppable">
          {(droppableProvided) => (
            <div
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
              className="flex h-[208px] flex-col gap-[10px] overflow-y-scroll"
            >
              {taskLists.length > 0 ? (
                taskLists.map((taskList, index) => (
                  <Draggable
                    key={taskList.id.toString()}
                    draggableId={taskList.id.toString()}
                    index={index}
                  >
                    {(draggableProvided) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        <TaskList
                          taskList={taskList}
                          groupId={groupId}
                          index={index}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <p className="flex h-full items-center justify-center text-text-default">
                  아직 할 일 목록이 없습니다.
                </p>
              )}
              {droppableProvided.placeholder} {/* 드래그 중 빈 공간 유지 */}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </div>
  );
}

export default TaskLists;
