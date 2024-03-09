// ❗ IMPORTANT
// The ✨ tasks found inside this component are not in order.
// Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from 'react'

let id = 0
const getId = () => ++id
const memberId = getId()

let teamMembers = [
  {
    id: getId(), fname: "Alice", lname: "Smith",
    bio: "Passionate about front-end development and user experience. \
I love creating intuitive and visually appealing web interfaces."
  },
  {
    id: getId(), fname: "Bob", lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. \
I enjoy bringing creativity and aesthetics to the digital world."
  },
]

export default function App() {
  const [members, setMembers] = useState(teamMembers)
  const [editing, setEditing] = useState(null)
  // ✨ Create a third state to track the values of the inputs
  const [inputValues, setInputValues] = useState({ fname: "", lname: "", bio: "" })

  useEffect(() => {
    // ✨ If the `editing` state changes from null to the number 2 (for example)
    // this means we need to populate the inputs of the form
    // with the data belonging to the member with id 2.
    // On the other hand, if the `editing` state changes back to null
    // then we need to reset the form back to empty values
    if (editing) {
      const member = members.find(mem => mem.id === editing)
      setInputValues({ fname: member.fname, lname: member.lname, bio: member.bio })
    } else {
      setInputValues({ fname: "", lname: "", bio: "" })
    }
  }, [editing])

  const onChange = evt => {
    // ✨ This is the change handler for your text inputs and your textarea.
    // You can check `evt.target.id` to know which input changed
    // and then you can use `evt.target.value` to update the state of the form
    const id = evt.target.id
    const value = evt.target.value
    console.log("value:", value);
    setInputValues({ ...inputValues, [id]: value })
  }
  const edit = id => {
    // ✨ Put this function inside a click handler for the <button>Edit</button>.
    // It should change the value of `editing` state to be the id of the member
    // whose Edit button was clicked
    setEditing(id)
  }
  const submitNewMember = () => {
    // This takes the values of the form and constructs a new member object,
    // which is then concatenated at the end of the `members` state
    const newMember = { id: memberId, fname: fname.value, lname: lname.value, bio: bio.value }
    setMembers(prevMembers => [...prevMembers, newMember]);
  }
  const editExistingMember = () => {
    // ✨ This takes the values of the form and replaces the data of the
    // member in the `members` state whose id matches the `editing` state
    const updatedMembers = members.map(mem => {
      if (mem.id === editing) {
        return {
          ...mem,
          fname: fname.value,
          lname: lname.value,
          bio: bio.value
        }
      }
      return mem
    })
    console.log("updatedMembers:", updatedMembers);
    setMembers(updatedMembers)
    setEditing(null)
  }
  const onSubmit = evt => {
    // ✨ This is the submit handler for your form element.
    // It will call either `submitNewMember` or `editExistingMember`
    // depending on whether the `editing` state is null or has an id in it.
    // Don't allow the page to reload! Prevent the default behavior

    evt.preventDefault();

    if (editing) {
      editExistingMember()
    } else {
      submitNewMember()
    }
    // and clean up the form after submitting
    setInputValues({ fname: "", lname: "", bio: "" })
  }
  return (
    <div>{/* ✨ Fix the JSX by wiring the necessary values and event handlers */}
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {
            members.map(mem => (
              <div key={mem.id} className="member">
                <div>
                  <h4>{mem.fname} {mem.lname}</h4>
                  <p>{mem.bio}</p>
                </div>
                <button onClick={() => edit(mem.id)}>Edit</button>
              </div>
            ))
          }
        </div>
      </div>
      <div id="membersForm">
        <h2>{editing ? 'Edit' : 'Add'} a Team Member</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="fname">First Name </label>
            <input id="fname" type="text" value={inputValues.fname} onChange={onChange} placeholder="Type First Name" />
          </div>

          <div>
            <label htmlFor="lname">Last Name </label>
            <input id="lname" type="text" value={inputValues.lname} onChange={onChange} placeholder="Type Last Name" />
          </div>

          <div>
            <label htmlFor="bio">Bio </label>
            <textarea id="bio" value={inputValues.bio} onChange={onChange} placeholder="Type Bio" />
          </div>

          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
