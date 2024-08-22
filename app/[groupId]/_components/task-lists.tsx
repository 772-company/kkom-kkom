"use client";

import Popover from "@/components/popover/popover";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import getGroupInfo from "@/lib/apis/group";
import { patchChangeTaskListIndex, postTaskList } from "@/lib/apis/task-list";
import { GetTeamIdGroupsIdResponse } from "@/lib/apis/type";
import Kebab from "@/public/icons/kebab-small.svg";
import ProgressDone from "@/public/icons/progress-done.svg";
import ProgressOngoing from "@/public/icons/progress-ongoing.svg";
import { useQuery } from "@tanstack/react-query";
import _debounce from "lodash/debounce";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";

import ModalTaskListAdd from "./modal/modal-task-list-add";
import ModalTaskListDelete from "./modal/modal-task-list-delete";
import ModalTaskListNameEdit from "./modal/modal-task-list-name-edit";
import { StrictModeDroppable } from "./strict-mode-droppable";

type TaskListType = GetTeamIdGroupsIdResponse["taskLists"][0];

interface TaskListProps {
  taskList: TaskListType;
  groupId: string;
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

const TaskList = ({ taskList, groupId }: TaskListProps) => {
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

  const colorIndex = taskList.displayIndex % 7;
  const pointColor = COLORS[colorIndex];
  const numberOfDone = taskList.tasks.filter(
    (tasks) => tasks.doneAt != null,
  ).length;

  const isDone = numberOfDone === taskList.tasks.length ? true : false;
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/${groupId}/tasks`)}
      className="flex h-[40px] cursor-pointer items-center justify-between rounded-[12px] bg-background-secondary text-[14px] font-[500] leading-[40px] text-text-primary"
    >
      <div className="flex gap-[12px]">
        <div className={`w-[12px] rounded-l-[12px] ${pointColor}`}></div>
        <p>{taskList.name}</p>
      </div>
      <div className="flex items-center gap-[10px] pr-[8px]">
        <div className="flex h-[25px] items-center gap-[4px] rounded-[12px] bg-background-primary px-[8px]">
          {isDone ? (
            <ProgressDone className="h-[16px] w-[16px]" />
          ) : (
            <ProgressOngoing className="h-[16px] w-[16px] animate-spin" />
          )}
          <p>
            {numberOfDone} / {taskList.tasks.length}
          </p>
        </div>
        <div
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
            contentClassName="z-10 border-[1px] absolute right-0 bg-background-secondary border-border-primary/10 w-[120px] h-[80px] text-white"
          />
        </div>
      </div>
    </div>
  );
};

const TaskLists = ({ groupId, isAdmin }: TaskListsProps) => {
  const ModalTaskListAddOverlay = useCustomOverlay(({ close }) => (
    <ModalTaskListAdd close={close} groupId={groupId} />
  ));

  const { data } = useQuery<GetTeamIdGroupsIdResponse>({
    queryKey: ["groupInfo"],
    queryFn: () => getGroupInfo({ groupId: groupId }),
  });

  const [taskLists, setTaskLists] = useState<TaskListType[]>(
    data ? data.taskLists : [],
  );

  // taskLists 초기화
  useEffect(() => {
    if (data) {
      setTaskLists(data.taskLists);
    }
  }, [data]);

  // 드래그가 끝났을 때 호출되는 함수
  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // 드래그 종료 위치가 유효하지 않으면 아무것도 하지 않음
    if (!destination) {
      return;
    }

    // 상태 업데이트를 위해 taskLists 배열 복사
    const updatedTaskLists = Array.from(taskLists);

    // 드래그한 항목을 원래 위치에서 제거
    const [movedTaskList] = updatedTaskLists.splice(source.index, 1);

    // 드래그한 항목을 새로운 위치에 삽입
    updatedTaskLists.splice(destination.index, 0, movedTaskList);

    // 이동한 tasklist의 displayIndex 재설정
    updatedTaskLists.forEach((taskLists, index) => {
      taskLists.displayIndex = index;
    });

    setTaskLists(updatedTaskLists);

    // 모든 taskList의 displayIndex를 서버에 업데이트
    updatedTaskLists.forEach((taskList, index) => {
      patchChangeTaskListIndex(groupId, taskList.id, {
        displayIndex: index,
      }).catch(console.error);
    });
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
            className="text-[14px] font-[400] text-brand-primary"
            onClick={ModalTaskListAddOverlay.open}
          >
            + 새로운 목록 추가하기
          </button>
        )}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="droppable">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex h-[208px] flex-col gap-[10px] overflow-y-scroll scrollbar-custom"
            >
              {taskLists.length > 0 ? (
                taskLists.map((taskList, index) => (
                  <Draggable
                    key={taskList.id.toString()}
                    draggableId={taskList.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskList taskList={taskList} groupId={groupId} />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <p className="flex h-full items-center justify-center text-text-default">
                  아직 할 일 목록이 없습니다.
                </p>
              )}
              {provided.placeholder} {/* 드래그 중 빈 공간 유지 */}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </div>
  );
};

export default TaskLists;
