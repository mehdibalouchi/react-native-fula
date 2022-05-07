# fula for react-native

## Usage

### Requirement
- `yarn`
- `go`
- `gomobile`

### Dependency
- `github.com/farhoud/go-fula/fula`

Build .aar with:
```
gomobile bind -v  -o android/app/fula.aar -target=android github.com/farhoud/go-fula/fula
```

Install npm dependencies:
```
yarn install
```

Run react-native server:
```
yarn start
```

Build for android:
```
yarn android
```