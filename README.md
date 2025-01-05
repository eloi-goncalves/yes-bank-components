# Steps to create a react library components to publish in npm

### Se ainda não iniciou o projeto, comece com:

```json
  mkdir minha-biblioteca-react
  cd minha-biblioteca-react
  npm init -y
```


### Instalar as Dependências
* Instale o TypeScript, os tipos para o React e outras dependências necessárias:
```json
npm install react react-dom
npm install --save-dev typescript @types/react @types/react-dom @babel/preset-typescript babel-loader @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli webpack-node-externals
npm install --save-dev tslint eslint

```
Aqui, além de instalar o TypeScript, estamos também instalando os tipos para o React (@types/react, @types/react-dom) e configurando o Babel para lidar com arquivos TypeScript.


### Configuração do TypeScript (tsconfig.json)
* Crie o arquivo tsconfig.json na raiz do projeto com a configuração básica:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "esnext"],
    "module": "esnext",
    "moduleResolution": "node",
    "jsx": "react",
    "declaration": true,                   // Gera arquivos de definição (.d.ts)
    "esModuleInterop": true,               // Para permitir importações default em módulos ComamonJS
    "strict": true,                        // Ativa o modo estrito do TypeScript
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}

```


###  Configuração do Babel para TypeScript (.babelrc)
* Atualize o arquivo .babelrc para suportar a transpilação de TypeScript:
```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
}

```

###  Configurando o Webpack
* Agora, vamos atualizar o webpack.config.js para incluir o TypeScript. O Webpack já está configurado com o babel-loader, mas precisamos garantir que ele também lide com arquivos .tsx.

```json
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.ts', // ponto de entrada do TypeScript
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'YesBankComponents',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: [nodeExternals()], // Exclui dependências externas
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Regra para TypeScript e TSX
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Resolvem os arquivos TS
  },
  devtool: 'source-map',  // Para depuração
};

```

### Agora basta criar os components a serem utilizados conforme exemplo 'field'



### Scripts e Build
  * Adicione os Scripts no package.json
  Atualize seu package.json para incluir o script de build, que agora usará o TypeScript e o Webpack.

  ```json
   "scripts": {
    "build": "tsc",
    "prepare": "npm run build"
  }

  ```

  * Gerar o Build - Execute o comando para gerar o build com Webpack:
  ```json
    npm run build
  ```

  *  Isso criará a versão final do seu pacote na pasta dist, com os arquivos .js e os arquivos de tipos .d.ts.



### Publicar no NPM

* Agora que o código está pronto e configurado, você pode publicar no NPM:

  Verifique seu package.json para garantir que as dependências estejam corretamente configuradas, e que main aponte para o arquivo correto de saída (dist/index.js), e que types aponte para a definição de tipos (dist/types/index.d.ts).
  Exemplo de package.json:

```json
{
  "name": "my-microfrontend-library",
  "version": "1.0.0",
  "description": "A library for creating components for microfrontends.",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "prepare": "npm run build",
    "test": "echo \"No tests yet\""
  },
  "devDependencies": {
    "typescript": "^4.0.0",
    "@types/node": "^14.0.0"
  }
}

```  


### Publicar no NPM:
* É necessário criar uma conta no npm ![NPM][https://www.npmjs.com/signup]
```json
npm login  # Se ainda não estiver logado
npm publish --access public

```


### Conclusão:

Agora sua biblioteca estará disponível no NPM com suporte a TypeScript e tipos para os seus componentes.

Com esses passos, você configurou um projeto React em TypeScript com uma estrutura bem definida, incluindo uma pasta separada para tipos personalizados. Isso torna sua biblioteca reutilizável e fácil de integrar em outros projetos. Se precisar de mais alguma ajuda, fico à disposição!
