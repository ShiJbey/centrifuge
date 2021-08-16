# Centrifuge: Narrative Pattern Editor and Profiler Tool

Cetrifuge is a cross-platform desktop tool for authoring narrative sifting patterns used to query a playtrace of [_Talk of the Town_](https://github.com/ShiJbey/talktown). _Talk of the Town_ is a simulationist story generator, and was used by the acclaimed augmented reality live-acting game, [_Bad News_](https://users.soe.ucsc.edu/~jor/publications/samuelBadNews.pdf). Here is an example [video](https://www.youtube.com/watch?v=NUnp44OkaQo) of _Bad New's_ gameplay.

Normally in _Bad News_, one player operates as the _Wizard_. Their job is to live-code inside a Python interpreter and find interesting dramatic content to communicate to the live-acting player. This process is tedious and requires knowledge of python programming and the internal simulation API. This application alleviates the live coding requirement by allowing players to define reusable narrative patterns using a visual drag-and-drop node-based interface.

The editor creates valid [Datascript](https://github.com/tonsky/datascript) queries for its JavaScript API.

![Centrifuge editor screenshot](./docs/resources/editor_screenshot.png 'Centrifuge Editor Screenshot')

## How to Use

1. Install a release build or clone a development version from GitHub (see instructions below)
2. Start the application and create a new editor tab.
3. Drag node types from the tray on the right, and drop them onto they editor
4. Click and drag from ports to create connections between nodes
   - **Delete node:** Click the node to highlight, press _delete_ or _backspace_
   - **Delete link:** Hold _shift_, click the link, press _delete_ or _backspace_
5. Click _Compile_, to compile the diagrams into code.

### Install Yarn (Optional)

This project uses yarn for package management. If you don't have it, feel free to install it with the command below. If you plan on contributing to this project, Yarn is a requirement:

```
npm i -g yarn
```

### Cloning and Building

1. `git clone https://github.com/ShiJbey/centrifuge.git`
2. `cd centrifuge`
3. `yarn` or `npm install`
4. `yarn start` or `npm start`

## Project Status

### Unsupported Query Syntax based on [Datomic Query Reference](https://docs.datomic.com/cloud/query/query-data-reference.html)

- [pull expressions\*](https://docs.datomic.com/cloud/query/query-data-reference.html#pull-expressions)
- [return maps](https://docs.datomic.com/cloud/query/query-data-reference.html#return-maps)
- [Aggregates (except for count)](https://docs.datomic.com/cloud/query/query-data-reference.html#built-in-aggregates)
- [functions](https://docs.datomic.com/cloud/query/query-data-reference.html#functions)
- [get-else](https://docs.datomic.com/cloud/query/query-data-reference.html#get-else)
- [get-some](https://docs.datomic.com/cloud/query/query-data-reference.html#get-some)
- [ground](https://docs.datomic.com/cloud/query/query-data-reference.html#ground)
- [missing?](https://docs.datomic.com/cloud/query/query-data-reference.html#missing)
- [tuple](https://docs.datomic.com/cloud/query/query-data-reference.html#tuple)
- [untuple](https://docs.datomic.com/cloud/query/query-data-reference.html#untuple)
- [not-join](https://docs.datomic.com/cloud/query/query-data-reference.html#not-join)
- [or-join](https://docs.datomic.com/cloud/query/query-data-reference.html#or-join)
- [database scoping](https://docs.datomic.com/cloud/query/query-data-reference.html#rule-database-scoping)

\*Datascript JS API doesnt support in-query pull expressions
