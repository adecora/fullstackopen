import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const Users = () => {
  const dispatch = useDispatch()

  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      <Table className="mt-3" striped bordered hover>
        <thead>
          <tr>
            <td>
              <strong>
                user
              </strong>
            </td>
            <td>
              <strong>
                blogs created
              </strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (<tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
            )
          }
          )}
        </tbody>
      </Table>
    </div>
  )
}
export default Users