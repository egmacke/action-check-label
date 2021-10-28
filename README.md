# action-check-label

Github Action to check for presence or absence of a PR/issue label

## Inputs

| Name            | Description                                             | Type      | Required | Default                    |
| --------------- | ------------------------------------------------------- | --------- | -------- | -------------------------- |
| `label`         | The label to test for                                   | `string`  | `true`   | `N/A`                      |
| `state`         | The state of the label [`present`, `absent`]            | `string`  | `false`  | `present`                  |
| `github_token`  | A github token                                          | `string`  | `false`  | `${{github.token}}`        |
| `repo`          | The owner and repository name                           | `string`  | `false`  | `${{ github.repository }}` |
| `fail_on_error` | Whether to fail the workflow if the state doesn't match | `boolean` | `false`  | `true`                     |

## Output

| Name  | Description                                                    |
| ----- | -------------------------------------------------------------- |
| state | The actual state of the label [`present`, `absent`]            |
| pass  | Whether the state matched the expected state [`true`, `false`] |

# Example use

For a simple check that a label exists on the current PR:

```yml
steps:
  - name: Check for present label
    uses: egmacke/action-check-label@v1
    with:
      label: test
```

For more examples, see `.github/workflows/test.yml`
