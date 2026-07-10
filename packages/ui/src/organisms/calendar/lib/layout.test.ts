import { describe, it, expect } from "vitest";
import { layoutOverlappingEvents, type PositionedEvent } from "./layout";
import type { CalendarEvent } from "../types";

function ev(id: string, startHour: number, endHour: number): CalendarEvent {
  const start = new Date(2025, 9, 6, startHour, 0, 0, 0); // 6 окт 2025
  const end = new Date(2025, 9, 6, endHour, 0, 0, 0);
  return { id, start, end, title: id, kind: "lesson" };
}

function byId(positioned: PositionedEvent[]): Record<string, PositionedEvent> {
  return Object.fromEntries(positioned.map((p) => [p.event.id, p]));
}

describe("layoutOverlappingEvents", () => {
  it("возвращает пустой массив на пустом входе", () => {
    expect(layoutOverlappingEvents([])).toEqual([]);
  });

  it("непересекающиеся события — все в одной колонке (columnCount = 1)", () => {
    const result = layoutOverlappingEvents([
      ev("a", 9, 10),
      ev("b", 10, 11),
      ev("c", 11, 12),
    ]);
    for (const p of result) {
      expect(p.columnIndex).toBe(0);
      expect(p.columnCount).toBe(1);
    }
  });

  it("касание границами (end == start) не считается пересечением", () => {
    const result = byId(
      layoutOverlappingEvents([ev("a", 9, 10), ev("b", 10, 11)]),
    );
    expect(result.a.columnCount).toBe(1);
    expect(result.b.columnCount).toBe(1);
    expect(result.a.columnIndex).toBe(0);
    expect(result.b.columnIndex).toBe(0);
  });

  it("два пересекающихся события — две колонки", () => {
    const result = byId(
      layoutOverlappingEvents([ev("a", 9, 11), ev("b", 10, 12)]),
    );
    expect(result.a.columnCount).toBe(2);
    expect(result.b.columnCount).toBe(2);
    expect(result.a.columnIndex).toBe(0);
    expect(result.b.columnIndex).toBe(1);
  });

  it("три взаимно пересекающихся — три колонки", () => {
    const result = byId(
      layoutOverlappingEvents([
        ev("a", 9, 12),
        ev("b", 10, 12),
        ev("c", 11, 12),
      ]),
    );
    expect(result.a.columnCount).toBe(3);
    expect(result.b.columnCount).toBe(3);
    expect(result.c.columnCount).toBe(3);
    expect(
      new Set([
        result.a.columnIndex,
        result.b.columnIndex,
        result.c.columnIndex,
      ]),
    ).toEqual(new Set([0, 1, 2]));
  });

  it("переиспользует освободившуюся колонку внутри кластера", () => {
    const result = byId(
      layoutOverlappingEvents([
        ev("a", 9, 10),
        ev("b", 9, 11),
        ev("c", 10, 11),
      ]),
    );
    expect(result.a.columnCount).toBe(2);
    expect(result.b.columnCount).toBe(2);
    expect(result.c.columnCount).toBe(2);
    expect(result.a.columnIndex).toBe(0);
    expect(result.b.columnIndex).toBe(1);
    expect(result.c.columnIndex).toBe(0);
  });

  it("разбивает на независимые кластеры", () => {
    const result = byId(
      layoutOverlappingEvents([
        ev("a", 9, 11),
        ev("b", 10, 12),
        ev("c", 14, 16),
        ev("d", 15, 17),
      ]),
    );
    expect(result.a.columnCount).toBe(2);
    expect(result.b.columnCount).toBe(2);
    expect(result.c.columnCount).toBe(2);
    expect(result.d.columnCount).toBe(2);
  });

  it("«мост» держит один кластер: b перекрывает и a, и c", () => {
    const a = ev("a", 9, 10);
    const b: CalendarEvent = {
      id: "b",
      start: new Date(2025, 9, 6, 9, 30),
      end: new Date(2025, 9, 6, 11, 0),
      title: "b",
      kind: "lesson",
    };
    const c: CalendarEvent = {
      id: "c",
      start: new Date(2025, 9, 6, 10, 30),
      end: new Date(2025, 9, 6, 12, 0),
      title: "c",
      kind: "lesson",
    };
    const result = byId(layoutOverlappingEvents([a, b, c]));
    expect(result.a.columnCount).toBe(2);
    expect(result.b.columnCount).toBe(2);
    expect(result.c.columnCount).toBe(2);
    expect(result.b.columnIndex).toBe(1);
  });

  it("не мутирует входной массив (порядок сохранён)", () => {
    const input = [ev("c", 11, 12), ev("a", 9, 10), ev("b", 10, 11)];
    const snapshot = input.map((e) => e.id);
    layoutOverlappingEvents(input);
    expect(input.map((e) => e.id)).toEqual(snapshot);
  });

  it("событие без end трактуется как точечное (не расширяет кластер)", () => {
    const point: CalendarEvent = {
      id: "p",
      start: new Date(2025, 9, 6, 9, 0),
      title: "p",
      kind: "deadline",
    };
    const result = byId(layoutOverlappingEvents([point, ev("a", 9, 10)]));
    expect(result.p.columnCount).toBeGreaterThanOrEqual(1);
  });
});
