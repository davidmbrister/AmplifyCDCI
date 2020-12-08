import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listCamps } from './graphql/queries';
import { createCamp as createCampMutation, deleteCamp as deleteCampMutation } from './graphql/mutations';

const initialFormState = { name: '', description: '' }
function App() {
  const [camps, setCamps] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchCamps();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchCamps();
  }

  async function fetchCamps () {
    const apiData = await API.graphql({ query: listCamps });
    const campsFromAPI = apiData.data.listCamps.items;
    await Promise.all(campsFromAPI.map(async note => {
      if (note.image) {
        const image = await Storage.get(note.image);
        note.image = image;
      }
      return note;
    }))
    setCamps(apiData.data.listCamps.items);
  }

  async function createCamp() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createCampMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setCamps([...camps, formData]);
    setFormData(initialFormState);
  }

  async function deleteCamp({ id }) {
    const newCampsArray = camps.filter(camp => camp.id !== id);
    setCamps(newCampsArray);
    await API.graphql({query: deleteCampMutation, variables: { input: id } });
  }
  return (
    <div className="App">
      <h1>My Camps App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Camp name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Camp description"
        value={formData.description}
      />
      <input
        type="file"
        onChange={onChange}
      />
      <button onClick={createCamp}>Create Camp</button>
      <div style={{marginBottom: 30}}>
        {
          camps.map(camp => (
            <div key={camp.id || camp.name}>
              <h2>{camp.name}</h2>
              <p>{camp.description}</p>
              <button onClick={() => deleteCamp(camp)}>Delete camp</button>
              {
                camp.image && <img src={camp.image} style={{width: 400}} />
              }
            </div>
          ))
        }
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
