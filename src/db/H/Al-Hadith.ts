import * as TS                          from "@/../types/myTypes"

const n = require( "@/../../db/H/نهج‌البلاغة.json" ) as TS.HDB;
const f = require( "@/../../db/H/نهج‌الفصاحة.json" ) as TS.HDB;
// const k = require( "./الكافي.json" ) as TS.HDB;
// const v = require( "./وسائل‌الشيعة.json" ) as TS.HDB;
// const m = require( "./مستدرك‌الوسائل.json" ) as TS.HDB;
// const a = require( "./more.json" ) as TS.HDB;
const z = require( "@/../../db/H/keep.json" ) as TS.HDB;

// .. temporary collection
let nHadith: TS.hadithCell[] = [];
// .. create db based on N
// for ( let p of [ ...k,...v,...n, ...f, ...m, ...z, ...a ] ) nHadith[ p.n ] = p;
for ( let p of [ ...n, ...f, ...z ] ) nHadith[ p.n ] = p;

// .. register it
export let Hadith = nHadith;