import React, { ReactElement, useState, useEffect} from 'react';
import {СheckerError, toLowerCase} from '../../classes/validation/validator';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Friends from '../../classes/Friends';
import BtnWait from '../UI/btnWait';
import {SearchProfile} from '../UI/searchProfile';
import bgSearch from '../../../public/img/searchwhite.svg';
import {SearchState, UserProfile} from '../../interfaces';

const SearchPanel = React.memo(styled.div`
    width: 100%;
    height: 50vh;
    margin-top: -390px;
    transition: all ease .35s;
    background: rgba(16,2,2,0.81);
    position: absolute;
    z-index: 11;
`);

const BtnClose = React.memo(styled.div`
    width: 25px;
    height: 25px;
    margin-right: 1px;
    margin-top: -16px;
    font-family: 'Conv_comic_andy';
    font-size: 18px;
    color: white;
    cursor: pointer;
    font-size: 48px;
    color: #ffe900;
    cursor: pointer;
    position: absolute;
    right: 0;
`);

const BtnSearch = React.memo(styled.button`
    display: block;
    width: 28px;
    height: 28px;
    background:url(${bgSearch}) no-repeat;
    background-size: cover;
    margin: 0 auto;
    border: none;
    outline: none;
    cursor: pointer;
`, () => true);

const Form = React.memo(styled.form`
    display: flex;
    flex-direction: column;
    font-family: 'Conv_mouth_breather';
    font-size: 72px;
    text-align:center;
    line-height: 22px;
    color: #f47b5b;
`);

const Input = React.memo(styled.input`
    display:flex;
    border-width: 2px;
    border-radius: 16.5px;
    border-color: rgb(147, 192, 31);
    border-style: solid;
    background-color: rgba(16,2,2,0.81);
    width: 233px;
    height: 29px;
    margin: 40px auto 8px auto;
    outline: none;
    font-family: 'Conv_mouth_breather';
    font-size: 16px;
    color: #851fc0;
    text-align: center;

    &::placeholder {
        font-family: 'Conv_mouth_breather';
        font-size: 16px;
        color: #851fc0;
        text-align: center;
    }
`);

let searchBar:HTMLElement;
let searchWord:HTMLInputElement;

export default (props): ReactElement => { 
    
    const [state, setState] = useState({data:false, loading:false, error:{}} as SearchState);

    useEffect(() => {
        searchBar = document.getElementById("search");
        searchWord = document.getElementById("searchword") as HTMLInputElement;
    }, []);
    
    let { register, handleSubmit, reset, errors } = useForm();
    
    const onSubmit = async (data) => {  
        toLowerCase(data, ['search']);
        errors=null;
        searchWord.disabled = true;
        setState({data:false, loading:true, error:{}});
        Friends.addFriend(data.search).then(data => {
                                            errors=null;
                                            searchWord.disabled = false;
                                            setState({data, loading:false, error:{}});
                                        })
                                      .catch(e => {
                                          errors=null;
                                          searchWord.disabled = false;
                                          (e === false) ? setState({data:false,loading:false, error:{'userunexists': true}})
                                           : setState({data:false,loading:false, error:{'FB_Error': true}});
                                        })    
    }   
    return(
        <SearchPanel id="search" >
        <BtnClose onClick={ () => {
            reset();
            setState({data:false, loading:false, error:{}});
            searchBar.setAttribute("style", "margin-top: -390px;")} }>X</BtnClose>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Input 
               onBlur={() => errors=null} 
               onInput={() => Object.keys(state.error).length ? setState(prev => ({...prev, error:{}})) 
                                                              : null} id="searchword" name="search" placeholder="search" type="search" ref={register({ required: true, maxLength: 25, minLength: 4 })}/>
        {  (state.loading ? <BtnWait /> : <BtnSearch />) }
        
        { Object.keys(errors).length ? <СheckerError error={errors} /> : 
          Object.keys(state.error).length ? <СheckerError error={state.error} />: null }
          
        {state.data && <SearchProfile user={state.data as UserProfile[]}/>}
        </Form>       
    </SearchPanel>
    ); }