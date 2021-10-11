# Centrifuge: Node-Based Sifting Pattern Editor

Centrifuge is a cross-platform visual programming tool that helps users author narrative sifting patterns for character-based simulated story worlds. Sifting patterns search the state of the simulation, looking for matching characters, events, and scenarios. Our goal with Centrifuge was to develop a tool that enables users to craft sifting patterns without learning a text-based programming syntax. Centrifuge is built on [DataScript](https://github.com/tonsky/datascript), an open-source in-memory database and datalog-based query language. Users drag-and-drop nodes that correspond to parts of DataScripts query syntax, and Centrifuge takes care of translating their pattern of nodes into a valid query.

The current version of Centrifuge is configured for use with the [_Talk of the Town_](https://github.com/james-owen-ryan/talktown) simulationist story generator. _Talk of the Town_ was the simulation back-end for the award-winning augmented reality live-acting game, [_Bad News_](https://users.soe.ucsc.edu/~jor/publications/samuelBadNews.pdf).
We chose this simulation because in _Bad News_, one player acts as the _Wizard_. Their job is to find interesting characters in the simulation by manually coding inside a Python interpreter. This manual story sifting is a tedious process and requires knowledge of python programming and the internal simulation structure. Here is an example [video](https://www.youtube.com/watch?v=NUnp44OkaQo) of gameplay.

![Centrifuge editor screenshot](./docs/resources/editor_screenshot.png 'Centrifuge Editor Screenshot')

## How to Use

1. Install a release build or clone a development version from GitHub (see instructions below)
2. Start the application and create a new editor tab.
3. Drag node types from the tray on the right, and drop them onto the editor
4. Click and drag from ports to create connections between nodes
    - **Delete node:** Click the node to highlight, press _delete_ or _backspace_
    - **Delete link:** Hold _shift_, click the link, press _delete_ or _backspace_
5. Click _Compile_ in the 'Output' tab to compile the diagrams into query code.

## Data Modeling

The nodes used in this editor are configured specifically for Talk of the Town's data. However, the general design approach coudl be modified to fit any social simulation.

The core entities/objects modeled in the python code become entities within the DataScript database. The include:

-   People
-   Businesses (Locations)
-   Relationships
-   Events

## Building Development Version

We use Yarn for package management. Please download it from npm with the following command.

```bash
npm i -g yarn
```

Then you can clone and run Centrifuge.

```bash
git clone https://github.com/ShiJbey/centrifuge.git

cd centrifuge

yarn

yarn start
```

## DataScript Syntax Support

The editor transforms patterns into valid [Datascript](https://github.com/tonsky/datascript) queries. DataScript is an free & open-source alternative to [Datomic](https://www.datomic.com/). Therefore it tries to offer the same query language features. Below are the features of the query language that Centrifuge does not currently support.

-   [pull expressions\*](https://docs.datomic.com/cloud/query/query-data-reference.html#pull-expressions)
-   [return maps](https://docs.datomic.com/cloud/query/query-data-reference.html#return-maps)
-   [Aggregates](https://docs.datomic.com/cloud/query/query-data-reference.html#built-in-aggregates)
-   [functions\*\*](https://docs.datomic.com/cloud/query/query-data-reference.html#functions)
-   [get-else](https://docs.datomic.com/cloud/query/query-data-reference.html#get-else)
-   [get-some](https://docs.datomic.com/cloud/query/query-data-reference.html#get-some)
-   [ground](https://docs.datomic.com/cloud/query/query-data-reference.html#ground)
-   [missing?](https://docs.datomic.com/cloud/query/query-data-reference.html#missing)
-   [tuple](https://docs.datomic.com/cloud/query/query-data-reference.html#tuple)
-   [untuple](https://docs.datomic.com/cloud/query/query-data-reference.html#untuple)
-   [database scoping](https://docs.datomic.com/cloud/query/query-data-reference.html#rule-database-scoping)

\* Datascript JS API doesn't support in-query pull expressions

\*\* We have a prototype function node available, but there is not yet a framework for creating custom function nodes given a set configuration parameters.
