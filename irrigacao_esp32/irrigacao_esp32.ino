#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>

// Configurações do WiFi
const char* ssid = "SeuWiFi";      // Altere para o nome da sua rede
const char* password = "SuaSenha";  // Altere para a senha da sua rede

// Definição dos pinos
const int SENSOR_UMIDADE = 34;  // ADC6/GPIO34
const int PINO_RELE = 26;       // GPIO26

// Variáveis globais
float umidadeSolo = 0;
float limiarUmidade = 40.0;  // Valor inicial do limiar (40%)
bool bombaLigada = false;

// Servidor Web na porta 80
WebServer server(80);

void setup() {
  Serial.begin(115200);
  
  // Configuração dos pinos
  pinMode(PINO_RELE, OUTPUT);
  digitalWrite(PINO_RELE, LOW);  // Inicia com a bomba desligada
  
  // Conexão WiFi
  WiFi.begin(ssid, password);
  Serial.println("Conectando ao WiFi...");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.println("Conectado ao WiFi!");
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP());

  // Configuração das rotas do servidor
  configurarRotasServidor();
  
  // Inicia o servidor
  server.begin();
  Serial.println("Servidor HTTP iniciado");
}

void configurarRotasServidor() {
  // Configuração do CORS
  server.enableCORS(true);
  
  // Rota GET /status
  server.on("/status", HTTP_GET, []() {
    StaticJsonDocument<200> doc;
    doc["umidade"] = umidadeSolo;
    doc["bomba"] = bombaLigada ? 1 : 0;
    
    String response;
    serializeJson(doc, response);
    
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(200, "application/json", response);
  });

  // Rota POST /config/limiar
  server.on("/config/limiar", HTTP_POST, []() {
    String body = server.arg("plain");
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, body);
    
    if (error) {
      server.send(400, "application/json", "{\"erro\": \"JSON inválido\"}");
      return;
    }
    
    if (doc.containsKey("limiar")) {
      limiarUmidade = doc["limiar"].as<float>();
      server.sendHeader("Access-Control-Allow-Origin", "*");
      server.send(200, "application/json", "{\"mensagem\": \"Limiar atualizado\"}");
    } else {
      server.send(400, "application/json", "{\"erro\": \"Limiar não especificado\"}");
    }
  });

  // Rota POST /comando
  server.on("/comando", HTTP_POST, []() {
    String body = server.arg("plain");
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, body);
    
    if (error) {
      server.send(400, "application/json", "{\"erro\": \"JSON inválido\"}");
      return;
    }
    
    if (doc.containsKey("acao")) {
      String acao = doc["acao"].as<String>();
      if (acao == "ligar") {
        digitalWrite(PINO_RELE, HIGH);
        bombaLigada = true;
      } else if (acao == "desligar") {
        digitalWrite(PINO_RELE, LOW);
        bombaLigada = false;
      } else {
        server.send(400, "application/json", "{\"erro\": \"Ação inválida\"}");
        return;
      }
      server.sendHeader("Access-Control-Allow-Origin", "*");
      server.send(200, "application/json", "{\"mensagem\": \"Comando executado\"}");
    } else {
      server.send(400, "application/json", "{\"erro\": \"Ação não especificada\"}");
    }
  });

  // Configuração do CORS para preflight
  server.on("/status", HTTP_OPTIONS, []() {
    configurarCORS();
  });
  
  server.on("/config/limiar", HTTP_OPTIONS, []() {
    configurarCORS();
  });
  
  server.on("/comando", HTTP_OPTIONS, []() {
    configurarCORS();
  });
}

void configurarCORS() {
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
  server.send(204);
}

void loop() {
  server.handleClient();
  
  // Leitura do sensor de umidade a cada 60 segundos
  static unsigned long ultimaLeitura = 0;
  if (millis() - ultimaLeitura >= 60000) {
    lerUmidade();
    ultimaLeitura = millis();
    
    // Controle automático da bomba
    if (!bombaLigada && umidadeSolo < limiarUmidade) {
      digitalWrite(PINO_RELE, HIGH);
      bombaLigada = true;
      Serial.println("Bomba ligada automaticamente");
    } else if (bombaLigada && umidadeSolo >= limiarUmidade) {
      digitalWrite(PINO_RELE, LOW);
      bombaLigada = false;
      Serial.println("Bomba desligada automaticamente");
    }
  }
}

void lerUmidade() {
  // Leitura do ADC (0-4095) e conversão para porcentagem (0-100)
  int valorADC = analogRead(SENSOR_UMIDADE);
  umidadeSolo = map(valorADC, 4095, 0, 0, 100);  // Inverte a escala pois o sensor é inversamente proporcional
  
  Serial.print("Umidade do solo: ");
  Serial.print(umidadeSolo);
  Serial.println("%");
} 