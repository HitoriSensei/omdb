import { withParams, withParamsAndQuery } from './withParams'

describe('withParamsAndQuery', () => {
  const fetchUser = withParams`/api/user/${'userId'}`
  const fetchUsers = withParamsAndQuery<{ sort?: 'asc' | 'desc' }>()`/api/group/${'groupId'}`
  const fetchUsersSlug = withParamsAndQuery<{
    sort?: 'asc' | 'desc'
  }>()`/api/group/${'...groupPath'}`

  const fetchSpecialUsersWithDefaultSorting = withParamsAndQuery<{
    sort?: 'asc' | 'desc'
  }>(
    {
      sort: 'asc',
    },
    {
      category: 'ops',
    },
  )`/api/group/${'...groupPath'}`

  const fetchSpecialUsersWithCustomSerializationSorting = withParamsAndQuery<{
    sort?: 'asc' | 'desc'
  }>({
    sort: (value) => (value ? `filter[sort][value]=${value}` : undefined),
  })`/api/group/${'...groupPath'}`

  it('works with optional query parameters', () => {
    expect(
      fetchUser({
        userId: 123,
      }),
    ).toEqual('/api/user/123')
  })

  it('works without optional parameters', () => {
    expect(
      fetchUsers({
        groupId: 'admin',
      }),
    ).toEqual('/api/group/admin')
  })

  it('works with query parameters', () => {
    expect(
      fetchUsers({
        groupId: 'admin',
        sort: 'asc',
      }),
    ).toEqual('/api/group/admin?sort=asc')
  })

  it('works with slug parameters', () => {
    expect(
      fetchUsersSlug({
        '...groupPath': 'adm/i[n',
        sort: 'asc',
      }),
    ).toEqual('/api/group/adm/i%5Bn?sort=asc')
  })

  it('works with seralized parameters', () => {
    expect(
      fetchSpecialUsersWithCustomSerializationSorting({
        '...groupPath': 'adm/i[n',
        sort: 'asc',
      }),
    ).toEqual('/api/group/adm/i%5Bn?filter[sort][value]=asc')
  })

  it('works with default parameters', () => {
    expect(
      fetchSpecialUsersWithDefaultSorting({
        '...groupPath': 'adm/in',
      }),
    ).toEqual('/api/group/adm/in?category=ops&sort=asc')
  })

  it('should not let override additional parameters', () => {
    expect(
      fetchSpecialUsersWithDefaultSorting({
        '...groupPath': 'adm/in',
        sort: 'desc',
        category: 'test',
      } as any),
    ).toEqual('/api/group/adm/in?category=ops&sort=desc')
  })
})
