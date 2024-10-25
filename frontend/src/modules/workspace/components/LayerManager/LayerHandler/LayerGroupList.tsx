import { useRef, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Box } from "@mui/material";

import { LayerGroupList as LayerGroupListType } from "../types";

import { LayerGroup } from "./LayerGroup";

type Props<T extends string> = {
  layerGroups: LayerGroupListType<T>;
  forcedInvisible: boolean;
  onVisibilityChange: (path: string[]) => void;
};

export const LayerGroupList = <T extends string>({
  layerGroups,
  forcedInvisible,
  onVisibilityChange,
}: Props<T>) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [groupList, setGroupList] = useState<T[]>(
    Object.keys(layerGroups) as T[]
  );

  const [expandedGroups, setExpandedGroups] = useState<T[]>(
    Object.keys(layerGroups) as T[]
  );

  const savedExpandedGroups = useRef<T[] | null>(null);

  const [activeLayerGroup, setActiveLayerGroup] = useState<T | null>(null);

  const handleDragStart = (e: DragStartEvent) => {
    savedExpandedGroups.current = expandedGroups;
    setExpandedGroups([]);
    setActiveLayerGroup(e.active.id as T);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setGroupList((groups) => {
        const oldIndex = groups.indexOf(active.id as T);
        const newIndex = groups.indexOf(over.id as T);

        return arrayMove(groups, oldIndex, newIndex);
      });
    }

    setActiveLayerGroup(null);

    setTimeout(() => {
      if (!savedExpandedGroups.current) return;
      setExpandedGroups(savedExpandedGroups.current);
      savedExpandedGroups.current = null;
    }, 200);
  };

  const handleDragCancel = () => {
    if (!savedExpandedGroups.current) return;
    setExpandedGroups(savedExpandedGroups.current);
    savedExpandedGroups.current = null;

    setActiveLayerGroup(null);
  };

  const handleExpand = (group: T) => {
    setExpandedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  return (
    <Box>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        collisionDetection={closestCenter}
      >
        <SortableContext
          items={groupList}
          strategy={verticalListSortingStrategy}
        >
          {groupList.map((groupKey) => {
            const group = layerGroups[groupKey];
            const { id } = group;
            return (
              <LayerGroup
                key={id}
                layerGroup={group}
                expanded={expandedGroups.includes(id)}
                handleExpand={() => handleExpand(id)}
                isDragging={activeLayerGroup === id}
                forcedInvisible={forcedInvisible}
                onVisibilityChange={onVisibilityChange}
              />
            );
          })}
          <DragOverlay>
            {activeLayerGroup && (
              <LayerGroup
                layerGroup={layerGroups[activeLayerGroup]}
                expanded={false}
                handleExpand={() => {}}
                forcedInvisible={forcedInvisible}
                onVisibilityChange={() => {}}
              />
            )}
          </DragOverlay>
        </SortableContext>
      </DndContext>
    </Box>
  );
};
