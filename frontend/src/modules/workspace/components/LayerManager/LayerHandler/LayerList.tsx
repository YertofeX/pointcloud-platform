import { useEffect, useState } from "react";
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

import { LayerList as LayerListType } from "../types";

import { Layer } from "./Layer";

type Props = {
  layers: LayerListType;
  forcedInvisible: boolean;
  onVisibilityChange: (path: string[]) => void;
};

export const LayerList = ({
  layers,
  forcedInvisible,
  onVisibilityChange,
}: Props) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [layerList, setLayerList] = useState<string[]>(Object.keys(layers));

  useEffect(() => {
    setLayerList(Object.keys(layers));
  }, [layers]);

  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  const handleDragStart = (e: DragStartEvent) => {
    setActiveLayer(e.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLayerList((groups) => {
        const oldIndex = groups.indexOf(active.id.toString());
        const newIndex = groups.indexOf(over.id.toString());

        return arrayMove(groups, oldIndex, newIndex);
      });
    }

    setActiveLayer(null);
  };

  const handleDragCancel = () => {
    setActiveLayer(null);
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
          items={layerList}
          strategy={verticalListSortingStrategy}
        >
          {layerList
            .filter((layerKey) => Boolean(layers[layerKey]))
            .map((layerKey) => {
              const layer = layers[layerKey];
              const { id } = layer;
              return (
                <Layer
                  key={id}
                  layer={layer}
                  isDragging={activeLayer === id}
                  forcedInvisible={forcedInvisible}
                  onVisibilityChange={onVisibilityChange}
                />
              );
            })}
        </SortableContext>
      </DndContext>
    </Box>
  );
};
