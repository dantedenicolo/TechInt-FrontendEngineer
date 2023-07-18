import { SortBy, type User } from '../types.d'

interface Props {
  users: User[]
  showColors: boolean
  deleteUser: (uuid: string) => void
  toogleSort: (method: SortBy) => void
}

export function UsersList ({ users, showColors, deleteUser, toogleSort }: Props) {
  return (
        <>
            <table width='100%' className='table'>
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th
                            onClick={() => { toogleSort(SortBy.NAME) }}
                            className='pointer'
                        >Nombre</th>
                        <th
                            onClick={() => { toogleSort(SortBy.LAST) }}
                            className='pointer'
                        >Apellido</th>
                        <th
                            onClick={() => { toogleSort(SortBy.COUNTRY) }}
                            className='pointer'
                        >Pais</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: User, index) => {
                      const style = showColors ? { backgroundColor: index % 2 === 0 ? '#333' : '#444' } : {}
                      return (
                        <tr key={user.login.uuid} style={style}>
                            <td><img src={user.picture.thumbnail} alt={user.name.first} /></td>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.location.country}</td>
                            <td>
                                <button onClick={() => { deleteUser(user.login.uuid) }}
                                >Eliminar</button>
                            </td>
                        </tr>
                      )
                    })}
                </tbody>
            </table>
        </>
  )
}
