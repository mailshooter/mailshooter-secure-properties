# mailshooter-secure-properties

## Install!
```
sudo npm install -g mailshooter-secure-properties
```

## Run!

--f=filename-to-encrypt<br/>
--o=output-filename<br/>
--k=secure-key (16, 24, 32 Ascii Chars)

```
cd examples/
mailshooter-secure-properties \
  --f=properties.yaml \
  --o=secure-properties.yaml \
  --k='A8uyYca0074LKQ4G'
```
