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

## Building Development Version

### Setup

This project uses yarn for package management. If your don't have it, feel free to install it with:

```
npm i -g yarn
```

### To-Do

- **Custom Port Models/Factories**
  - Clause Port
  - Constant Value Port
  - Entity Output Port
    - Add entity type as an additional type string
  - Entity Attribute Port
    - Get use this to get the attribute name from the parent node
    -


### Cloning and Building

1. `git clone https://github.com/ShiJbey/centrifuge.git`
2. `cd centrifuge`
3. `yarn`
4. `yarn start`

## Project Status

The editor creates valid [Datascript](https://github.com/tonsky/datascript) queries for its JavaScript API.

### Unsupported Query Syntax based on [Datomic Query Reference](https://docs.datomic.com/cloud/query/query-data-reference.html)

- [pull expressions\*](https://docs.datomic.com/cloud/query/query-data-reference.html#pull-expressions)
- [return maps](https://docs.datomic.com/cloud/query/query-data-reference.html#return-maps)
- [Aggregates](https://docs.datomic.com/cloud/query/query-data-reference.html#built-in-aggregates)
- [functions](https://docs.datomic.com/cloud/query/query-data-reference.html#functions)
- [get-else](https://docs.datomic.com/cloud/query/query-data-reference.html#get-else)
- [get-some](https://docs.datomic.com/cloud/query/query-data-reference.html#get-some)
- [ground](https://docs.datomic.com/cloud/query/query-data-reference.html#ground)
- [missing?](https://docs.datomic.com/cloud/query/query-data-reference.html#missing)
- [tuple](https://docs.datomic.com/cloud/query/query-data-reference.html#tuple)
- [untuple](https://docs.datomic.com/cloud/query/query-data-reference.html#untuple)
- [database scoping](https://docs.datomic.com/cloud/query/query-data-reference.html#rule-database-scoping)

\*Datascript JS API doesn't support in-query pull expressions
