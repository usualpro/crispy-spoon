import React, { useEffect } from 'react';
import DexieService from './services/DexieService';
import { render } from 'react-dom';
import Faker from 'faker';
import { observable, toJS } from 'mobx';
import { Observer } from 'mobx-react';


const person = () => ({
    name: Faker.name.findName(),
    email: Faker.internet.email(),
    company: Faker.company.companyName()
})

const charactersData = observable.box([]);

const displayCharacters = () => DexieService.list().then((result) => {
    charactersData.set(result);
});

const App = () => {

    const putCharacter = () => {
        DexieService.put(person()).then(() => displayCharacters());
    }

    const onPersonFieldChange = (input, person) => {
        const editedPerson = toJS(person);
        editedPerson[input.currentTarget.name] = input.currentTarget.value;
        DexieService.put(editedPerson);
    }

    const Character = (props) => Object.keys(props.person).map(
        (keyName, index) => (keyName !== 'id')
            ? <input name={keyName} key={index} onChange={(input) => onPersonFieldChange(input, props.person)} defaultValue={props.person[keyName]} />
            : null
    );

    const ListCharacters = () => <Observer>
        {
            () => charactersData.get().map(
                (person, i) => <div key={i}>
                    {
                        <Character person={person} />
                    }
                </div>
            )
        }
    </Observer>;

    useEffect(displayCharacters, []);

    return <div>
        <ListCharacters />
        <button onClick={putCharacter}>Add a character</button>
    </div>
};
render(<App />, document.getElementById('root'));