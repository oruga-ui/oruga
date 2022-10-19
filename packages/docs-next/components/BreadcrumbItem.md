---
title: Breadcrumb Item
---

# Breadcrumb Item

<example-breadcrumbitem />

## Class props

<br />

<inspector-breadcrumbitem-viewer />

<br />
<br />

## Props

| Prop name | Description                                          | Type    | Values                                            | Default |
| --------- | ---------------------------------------------------- | ------- | ------------------------------------------------- | ------- |
| active    | item when it clicked, optional                       | boolean | `false`, `true`                                   | false   |
| disabled  | an item to be useless with no click events, optional | boolean | `false`, `true`                                   | false   |
| iconLeft  | Icon name to show on the left                        | string  | -                                                 |         |
| iconPack  | Icon pack to use                                     | string  | `mdi`, `fa`, `fas and any other custom icon pack` |         |
| iconRight | Icon name to show on the right                       | string  | -                                                 |         |
| iconSize  | Icon size to show                                    | string  | -                                                 |         |
| override  |                                                      | boolean | -                                                 |         |
| tag       | HTML Tag of items, optional                          | string  | `a`, `router-link`                                | 'a'     |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
