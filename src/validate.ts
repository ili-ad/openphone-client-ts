export function assertValidCreatedRange(
  createdAfter?: string,
  createdBefore?: string
): void {
  if (createdAfter === undefined || createdBefore === undefined) {
    return
  }

  const createdAfterTime = new Date(createdAfter)
  const createdBeforeTime = new Date(createdBefore)

  if (
    Number.isNaN(createdAfterTime.getTime()) ||
    Number.isNaN(createdBeforeTime.getTime())
  ) {
    throw new Error('createdAfter/createdBefore must be valid date-time strings')
  }

  if (createdAfterTime.getTime() > createdBeforeTime.getTime()) {
    throw new Error('createdAfter must be <= createdBefore')
  }
}
