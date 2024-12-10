import { Multiset } from "algorithm/Multiset";

import axios from "axios";
import { decode } from 'html-entities';

function sleep(ms: number) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
}

export const AddWord = async (marking: any, index: number, crossword: string[][], maxLen: number, wordCount: number, distinct: Multiset<number[]>, visited: number[], direction: Array<[number, number, number, string]>, cwDescription: string[][]) => {
    let col: number = marking[0], row: number = marking[1], length: number = marking[2];
    let dir: string = marking[3];

    let colRange = [col, col];
    let rowRange = [row, row];

    if(dir === "up")
        colRange[0] -= length + 1;
    if(dir === "down")
        colRange[1] += length - 1;
    if(dir === "left")
        rowRange[0] -= length + 1;
    if(dir === "right")
        rowRange[1] += length - 1;

    let overlapping = 0;

    for(let i=0; i<wordCount; i++)
    {
        for(let item of distinct.entries())
        {
            let opp: number;
            if(item[0][0] === index)
                opp = item[0][1];
            else if(item[0][1] === index)
                opp = item[0][0];
            else continue;

            let checked = (opp === index) ? true : false;

            if(checked && !visited[opp])
            {
                overlapping += 1;
                break;
            }
        }
    
        if(overlapping)
            if(!visited[i])
            {
                visited[i] = 1;

                AddWord(direction[i], i, crossword, maxLen, wordCount, distinct, visited, direction, cwDescription);
            }
    }
    
    let free = true;
    
    let letter: string = "";

    let word: string = "";
    let description: string = "";

    let s = 0;
    
    for(let i=colRange[0]; i<=colRange[1]; i++)
        for(let j=rowRange[0]; j<=rowRange[1]; j++)
        {
            if(crossword[i][j])
            {
                free = false;
                letter += crossword[i][j];
                s += 1;
            }
            else
                letter += "_"
        }

    let requestSet: string[] = await SearchWord(letter, colRange, rowRange, length, letter)

    word = requestSet[0]

    if(word === "no word" || word === "X")
        return word

    description = requestSet[1]

    AssigningLetter(colRange, rowRange, word, crossword, description, cwDescription)

    return "0"
}

const AssigningLetter = (colRange: number[], rowRange: number[], word: string, crossword: string[][], description: string, cwDescription: string[][]) => {
    let s = 0;
    
    for(let i=colRange[0]; i<=colRange[1]; i++)
        for(let j=rowRange[0]; j<=rowRange[1]; j++)
        {
            if(cwDescription[i][j])
            {
                if(cwDescription[i][j].includes(description)) continue;
                cwDescription[i][j] = cwDescription[i][j] + " / " + description;
            }
            else
                cwDescription[i][j] = description;

            crossword[i][j] = word[s];

            s += 1;
        }
}

export const SearchWord = async (letter: any, colRange: any, rowRange: any, length: number, wordStructure: string) => {
    sleep(2000);

    let word: string = "";
    let description: string = "";

    let requestSet: string[] = ["", ""];

    try {
        const url = 'http://10.0.2.2:5000/find_word';

        const options = {
            "regExp": wordStructure,
        };

        const response = await axios.post(url, options);
        word = response.data;

        console.log(word)

        if(word === "no word" || word === "X")
        {
            requestSet = [word, ""];
            return requestSet
        }

    } catch(e) {
        return requestSet
    }

    try {
        const key = '987D5400AEA9E504997A29E80F99C1BA';
        const url = `https://opendict.korean.go.kr/api/search?key=${key}&q=${word}`

        const response = await axios.get(url);
        console.log(decode(response.data.split("<definition>")[1].split("</definition >")[0]));
        description = response.data.split("<pos>")[1].split("</pos>")[0] + "; " + decode(response.data.split("<definition>")[1].split("</definition >")[0]);

    } catch(e) {
        return requestSet
    }

    requestSet = [word, description];

    return requestSet;
};