export function assertValidCreatedRange(
  createdAfter?: string,
  createdBefore?: string
): void {
  if (!createdAfter || !createdBefore) return

  const createdAfterDate = new Date(createdAfter)
  const createdBeforeDate = new Date(createdBefore)

  if (Number.isNaN(createdAfterDate.getTime()) || Number.isNaN(createdBeforeDate.getTime())) {
    throw new Error('createdAfter/createdBefore must be valid date-time strings')
  }

  if (createdAfterDate.getTime() > createdBeforeDate.getTime()) {
    throw new Error('createdAfter must be <= createdBefore')
  }
}
