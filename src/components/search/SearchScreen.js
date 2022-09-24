import React, { useMemo } from 'react'
import queryString from 'query-string'
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm'
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';

export const SearchScreen = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { q = '' } = queryString.parse(location.search);

    const [formValues, handleInputChange] = useForm({
        searchText: q,
    })

    const { searchText } = formValues;

    const heroesFilter = useMemo(() => getHeroesByName(q), [ q ])

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(searchText);
        navigate(`?q=${searchText}`)

    }
    return (
        <>
            <h1>Busquedas</h1>
            <hr></hr>

            <div className="row">
                <div className="col-5">
                    <h4>Formulario</h4>
                    <hr />

                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder='buscar un heroe'
                            className='form-control'
                            name="searchText"
                            autoComplete='off'
                            value={searchText}
                            onChange={handleInputChange}
                        />

                        <div className="d-grid gap-2">
                            <button
                                type="submit"
                                className='btn btn-outline-primary mt-1'
                            >
                                Buscar
                            </button>
                        </div>
                    </form>

                </div>

                <div className="col-7">
                    <h4>resultados</h4>
                    <hr />

                    {
                        (q === '')
                            ? <div className="alert alert-info">Buscar un heroe</div>
                            : (heroesFilter.length === 0) && <div className="alert alert-danger">No hay resultados: { q }</div>
                    }

                    {
                        heroesFilter.map(hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }
                </div>
            </div>

        </>
    )
}
