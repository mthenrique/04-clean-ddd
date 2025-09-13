import { WatchedList } from './watched-list'
import { describe, expect, it } from 'vitest'

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b
  }
}

describe('WatchedList', () => {
  it('should be able to create a watched list with initial items', () => {
    const list = new NumberWatchedList([1, 2, 3])

    expect(list.currentItems).toHaveLength(3)
  })

  it('should be able to add new items', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.add(4)

    expect(list.currentItems).toHaveLength(4)
    expect(list.getNewItems()).toEqual([4])
  })

  it('should be able to remove current items', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.remove(2)

    expect(list.currentItems).toHaveLength(2)
    expect(list.getRemovedItems()).toEqual([2])
  })

  it(`should be able to add an item even if it's removed before`, () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.remove(2)
    list.add(2)

    expect(list.currentItems).toHaveLength(3)
    expect(list.getNewItems()).toEqual([])
    expect(list.getRemovedItems()).toEqual([])
  })

  it(`should be able to remove an item even if it's added before`, () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.add(4)
    list.remove(4)

    expect(list.currentItems).toHaveLength(3)
    expect(list.getNewItems()).toEqual([])
    expect(list.getRemovedItems()).toEqual([])
  })

  it('should be able to update watched list items', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.update([2, 3, 4, 5])

    expect(list.currentItems).toHaveLength(4)
    expect(list.getNewItems()).toEqual([4, 5])
    expect(list.getRemovedItems()).toEqual([1])
  })

  it('should not be able to add duplicated new items', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.add(4)
    list.add(4)

    expect(list.currentItems).toHaveLength(4)
    expect(list.getNewItems()).toEqual([4])
  })
})
