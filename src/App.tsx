import { useEffect, useState, useRef, useMemo } from 'react'
import './App.css'
import { type User, SortBy } from './types.d'
import { UsersList } from './components/UsersList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState<boolean>(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const originalUsers = useRef<User[]>([])

  const toogleColors = () => {
    setShowColors(!showColors)
  }

  const toogleSort = (method: SortBy) => {
    setSorting(sorting === method ? SortBy.NONE : method)
  }

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
      : users
  }, [filterCountry, users])

  const sortedUsers = useMemo(() => {
    return sorting === SortBy.COUNTRY
      ? filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
      : sorting === SortBy.NAME
        ? filteredUsers.toSorted((a, b) => a.name.first.localeCompare(b.name.first))
        : sorting === SortBy.LAST
          ? filteredUsers.toSorted((a, b) => a.name.last.localeCompare(b.name.last))
          : filteredUsers
  }, [sorting, filteredUsers])

  const handleDeleteUser = (uuid: string) => {
    const filteredUsers = users.filter(user => user.login.uuid !== uuid)
    setUsers(filteredUsers)
  }

  const handleResetState = () => {
    setUsers(originalUsers.current)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async response => await response.json())
      .then(data => {
        setUsers(data.results)
        originalUsers.current = data.results
      })
      .catch(error => { console.error(error) })
  }, [])

  return (
    <>
      <h1>Prueba técnica Frontend Engineer - React + Typescript</h1>
      <header className='buttons-container'>
        <button onClick={toogleColors}>Cambiar colores</button>
        <button onClick={
          () => { toogleSort(SortBy.COUNTRY) }
        }>{sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}</button>
        <button onClick={handleResetState}>Resetear</button>
        <input
          type='text'
          placeholder='Filtrar por país'
          className='filter-input'
          onChange={e => { setFilterCountry(e.target.value) } } />
      </header>
      <UsersList showColors={showColors} users={sortedUsers} deleteUser={handleDeleteUser} toogleSort={toogleSort} />
    </>
  )
}

export default App
