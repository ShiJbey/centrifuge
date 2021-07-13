# Centrifuge: Narrative Pattern Editor and Profiler Tool

This is a cross-platform desktop tool for edditing narrative patterns and obtaining pattern metrics from a playtrace of Talk of the Town.

This version was built specifically for use with the [Talk of the Town](https://github.com/ShiJbey/talktown) simulationist story generator, made popular by the augmented reality live-acting game, [Bad News](https://users.soe.ucsc.edu/~jor/publications/samuelBadNews.pdf). Here is an example [video](https://www.youtube.com/watch?v=NUnp44OkaQo) of gameplay.

Normally in Bad News, one player acts as the _Wizard_ and must live-code inside a Python interpreter to find interestin dramatic content and surface it to the live-acting player. This process is tedious and requires knowledge of python programming and the internal simulation API. This application alleviates the live coding requirement by allowing players to define reusable narrative patterns using a visual node-based interface. Patterns can be used during or outside of gameplay to inspect simulation states. As an additional bonus, Centrifuge also allows users to visualize pattern metrics so that they may better characterize the simulation and its configuration.

![Centrifuge editor screenshot](./docs/resources/editor_screenshot.png 'Centrifuge Editor Screenshot')

## How to Use

1. Install a release build or clone a development version from GitHub (see instructions below)
2. Start the application and create a new editor tab.
3. Drag node types from the tray on the right, and drop them onto they editor
4. Click and drag from ports to create connections between nodes
   - **Delete node:** Click the node to highlight, press _delete_ or _backspace_
   - **Delete link:** Hold _shift_, click the link, press _delete_ or _backspace_
5. Click _Compile_, to compile the diagrams into code.

## Data Modeling

The nodes used in this editor are configured specifically for Talk of the Town's data. However, the general design approach coudl be modified to fit any social simulation. 

The core entities/objects modeled in the python code become entities within the DataScript database. The include:
- People
- Businesses (Locations)
- Relationships
- Events

## Building Development Version

### Setup

This project uses yarn for package management. If you don't have it, we recommend you install it with, `npm i -g yarn`. Without it, dependencies can still be installed using `npm`.

### Cloning and Building

1. `git clone https://github.com/ShiJbey/centrifuge.git`
2. `cd centrifuge`
3. `yarn` or `npm install`
4. `yarn start` or `npm start`

## Project Status

The editor creates valid queries to be passed to [DataScript's](https://github.com/tonsky/datascript) JavaScript API.

### Supported Query Syntax from [Datomic Query Reference](https://docs.datomic.com/cloud/query/query-data-reference.html)
- [:with-clauses](https://docs.datomic.com/cloud/query/query-data-reference.html#with)
- [rule expressions](https://docs.datomic.com/cloud/query/query-data-reference.html#using-rule)
- [not-clause](https://docs.datomic.com/cloud/query/query-data-reference.html#not-clauses)
- [or-clause](https://docs.datomic.com/cloud/query/query-data-reference.html#or-clauses)
- [range predicates](https://docs.datomic.com/cloud/query/query-data-reference.html#range-predicates)
- [count aggregate](https://docs.datomic.com/cloud/query/query-data-reference.html#built-in-aggregates)

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

\*While you can do pull operations in DataScript, the JavaScript API does not support **in-query** pull expressions.
